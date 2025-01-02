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
    public class RecurringExpenseController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly IRecurringExpenseRepository recurringExpenseRepository;
        private readonly IMapper mapper;

        public RecurringExpenseController(ExpenseTrackerDbContext dbContext,
            IRecurringExpenseRepository recurringExpenseRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.recurringExpenseRepository = recurringExpenseRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddRecurringExpenseDto addRecurringExpenseDto)
        {

            var recurringExpenseDomainModel = mapper.Map<RecurringExpense>(addRecurringExpenseDto);

            try
            {
                dbContext.RecurringExpenses.Add(recurringExpenseDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the recurring expense.");
            }

            var recurringExpenseDto = mapper.Map<RecurringExpenseDto>(recurringExpenseDomainModel);
            return Ok(recurringExpenseDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var recurringExpenses = await recurringExpenseRepository.GetAllAsync();

            var recurringExpensesDto = mapper.Map<List<RecurringExpenseDto>>(recurringExpenses);

            return Ok(recurringExpensesDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var recurringExpense = await recurringExpenseRepository.GetByIdAsync(id);

            if (recurringExpense == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<RecurringExpenseDto>(recurringExpense));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateRecurringExpenseDto updateRecurringExpenseDto)
        {
            var recurringExpenseDomainModel = mapper.Map<RecurringExpense>(updateRecurringExpenseDto);

            recurringExpenseDomainModel = await recurringExpenseRepository.UpdateAsync(id, recurringExpenseDomainModel);

            if (recurringExpenseDomainModel == null)
            {
                return NotFound();
            }

            var recurringExpenseDto = mapper.Map<RecurringExpenseDto>(recurringExpenseDomainModel);

            return Ok(recurringExpenseDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var recurringExpenseDomainModel = await recurringExpenseRepository.DeleteAsync(id);

            if (recurringExpenseDomainModel == null)
            {
                return NotFound();
            }

            var recurringExpenseDto = mapper.Map<RecurringExpenseDto>(recurringExpenseDomainModel);

            return Ok(recurringExpenseDto);
        }

    }
}
