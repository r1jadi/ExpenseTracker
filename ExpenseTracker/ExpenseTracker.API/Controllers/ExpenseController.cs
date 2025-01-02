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
    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly IExpenseRepository expenseRepository;
        private readonly IMapper mapper;

        public ExpenseController(ExpenseTrackerDbContext dbContext,
            IExpenseRepository expenseRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.expenseRepository = expenseRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddExpenseDto addExpenseDto)
        {

            var expenseDomainModel = mapper.Map<Expense>(addExpenseDto);

            try
            {
                dbContext.Expenses.Add(expenseDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the expense.");
            }

            var expenseDto = mapper.Map<ExpenseDto>(expenseDomainModel);
            return Ok(expenseDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var expenses = await expenseRepository.GetAllAsync();

            var expensesDto = mapper.Map<List<ExpenseDto>>(expenses);
            return Ok(expensesDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var expense = await expenseRepository.GetByIdAsync(id);

            if (expense == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<ExpenseDto>(expense));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExpenseDto updateExpenseDto)
        {
            var expenseDomainModel = mapper.Map<Expense>(updateExpenseDto);

            expenseDomainModel = await expenseRepository.UpdateAsync(id, expenseDomainModel);

            if (expenseDomainModel == null)
            {
                return NotFound();
            }

            var expenseDto = mapper.Map<ExpenseDto>(expenseDomainModel);
            return Ok(expenseDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var expenseDomainModel = await expenseRepository.DeleteAsync(id);

            if (expenseDomainModel == null)
            {
                return NotFound();
            }

            var expenseDto = mapper.Map<ExpenseDto>(expenseDomainModel);

            return Ok(expenseDto);
        }
    }
}
