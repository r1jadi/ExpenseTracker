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
    public class CurrencyController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly ICurrencyRepository currencyRepository;
        private readonly IMapper mapper;

        public CurrencyController(ExpenseTrackerDbContext dbContext,
            ICurrencyRepository currencyRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.currencyRepository = currencyRepository;
            this.mapper = mapper;
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddCurrencyRequestDto addCurrencyRequestDto)
        {


            var currencyDomainModel = mapper.Map<Currency>(addCurrencyRequestDto);

            try
            {
                dbContext.Currencies.Add(currencyDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the currency.");
            }

            var currencyDto = mapper.Map<Currency>(currencyDomainModel);
            return Ok(currencyDto);


        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var currencies = await currencyRepository.GetAllAsync();

            var currenciesDto = mapper.Map<List<CurrencyDto>>(currencies);

            return Ok(currenciesDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var currency = await currencyRepository.GetByIdAsync(id);

            if (currency == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<CurrencyDto>(currency));
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCurrencyRequestDto updateCurrencyRequestDto)
        {
            var currencyDomainModel = mapper.Map<Currency>(updateCurrencyRequestDto);

            currencyDomainModel = await currencyRepository.UpdateAsync(id, currencyDomainModel);

            if (currencyDomainModel == null)
            {
                return NotFound();
            }

            var currencyDto = mapper.Map<CurrencyDto>(currencyDomainModel);

            return Ok(currencyDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var currencyDomainModel = await currencyRepository.DeleteAsync(id);

            if (currencyDomainModel == null)
            {
                return NotFound();
            }

            var currencyDto = mapper.Map<CurrencyDto>(currencyDomainModel);

            return Ok(currencyDto);
        }
    }
}
