using AutoMapper;
using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;
using ExpenseTracker.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly IIncomeRepository incomeRepository;
        private readonly IMapper mapper;

        public IncomeController(ExpenseTrackerDbContext dbContext,
            IIncomeRepository incomeRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.incomeRepository = incomeRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddIncomeDto addIncomeDto)
        {

            var incomeDomainModel = mapper.Map<Income>(addIncomeDto);

            try
            {
                dbContext.Incomes.Add(incomeDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the income.");
            }

            var incomeDto = mapper.Map<IncomeDto>(incomeDomainModel);
            return Ok(incomeDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var incomes = await incomeRepository.GetAllAsync();

            var incomesDto = mapper.Map<List<IncomeDto>>(incomes);

            return Ok(incomesDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var income = await incomeRepository.GetByIdAsync(id);

            if (income == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<IncomeDto>(income));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateIncomeDto updateIncomeDto)
        {
            var incomeDomainModel = mapper.Map<Income>(updateIncomeDto);

            incomeDomainModel = await incomeRepository.UpdateAsync(id, incomeDomainModel);

            if (incomeDomainModel == null)
            {
                return NotFound();
            }

            var incomeDto = mapper.Map<IncomeDto>(incomeDomainModel);

            return Ok(incomeDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var incomeDomainModel = await incomeRepository.DeleteAsync(id);

            if (incomeDomainModel == null)
            {
                return NotFound();
            }

            var incomeDto = mapper.Map<IncomeDto>(incomeDomainModel);

            return Ok(incomeDto);
        }
    }
}
