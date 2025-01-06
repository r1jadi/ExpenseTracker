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
    public class TransactionController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly ITransactionRepository transactionRepository;
        private readonly IMapper mapper;

        public TransactionController(ExpenseTrackerDbContext dbContext,
            ITransactionRepository transactionRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.transactionRepository = transactionRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddTransactionDto addTransactionDto)
        {

            var transactionDomainModel = mapper.Map<Transaction>(addTransactionDto);

            try
            {
                dbContext.Transactions.Add(transactionDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the transaction.");
            }

            var transactionDto = mapper.Map<Transaction>(transactionDomainModel);
            return Ok(transactionDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transactions = await transactionRepository.GetAllAsync();

            var transactionsDto = mapper.Map<List<TransactionDto>>(transactions);
            return Ok(transactionsDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var transaction = await transactionRepository.GetByIdAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<TransactionDto>(transaction));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTransactionDto updateTransactionDto)
        {
            var transactionDomainModel = mapper.Map<Transaction>(updateTransactionDto);

            transactionDomainModel = await transactionRepository.UpdateAsync(id, transactionDomainModel);

            if (transactionDomainModel == null)
            {
                return NotFound();
            }

            var transactionDto = mapper.Map<TransactionDto>(transactionDomainModel);
            return Ok(transactionDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var transactionDomainModel = await transactionRepository.DeleteAsync(id);

            if (transactionDomainModel == null)
            {
                return NotFound();
            }

            var transactionDto = mapper.Map<TransactionDto>(transactionDomainModel);

            return Ok(transactionDto);
        }
    }
}
