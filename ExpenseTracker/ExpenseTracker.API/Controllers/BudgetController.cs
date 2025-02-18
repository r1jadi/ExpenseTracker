using AutoMapper;
using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;
using ExpenseTracker.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly IBudgetRepository budgetRepository;
        private readonly IMapper mapper;

        public BudgetController(ExpenseTrackerDbContext dbContext,
            IBudgetRepository budgetRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.budgetRepository = budgetRepository;
            this.mapper = mapper;
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddBudgetDto addBudgetDto)
        {

            var budgetDomainModel = mapper.Map<Budget>(addBudgetDto);

            try
            {
                dbContext.Budgets.Add(budgetDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the budget.");
            }

            var budgetDto = mapper.Map<BudgetDto>(budgetDomainModel);
            return Ok(budgetDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var budgets = await budgetRepository.GetAllAsync();

            var budgetsDto = mapper.Map<List<BudgetDto>>(budgets);

            return Ok(budgetsDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var budget = await budgetRepository.GetByIdAsync(id);

            if (budget == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<BudgetDto>(budget));
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateBudgetDto updateBudgetDto)
        {
            var budgetDomainModel = mapper.Map<Budget>(updateBudgetDto);

            budgetDomainModel = await budgetRepository.UpdateAsync(id, budgetDomainModel);

            if (budgetDomainModel == null)
            {
                return NotFound();
            }

            var budgetDto = mapper.Map<BudgetDto>(budgetDomainModel);

            return Ok(budgetDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var budgetDomainModel = await budgetRepository.DeleteAsync(id);

            if (budgetDomainModel == null)
            {
                return NotFound();
            }

            var budgetDto = mapper.Map<BudgetDto>(budgetDomainModel);

            return Ok(budgetDto);
        }
    }
}
