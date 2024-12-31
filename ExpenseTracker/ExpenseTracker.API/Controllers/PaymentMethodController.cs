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
    public class PaymentMethodController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly IPaymentMethodRepository paymentMethodRepository;
        private readonly IMapper mapper;

        public PaymentMethodController(ExpenseTrackerDbContext dbContext,
            IPaymentMethodRepository paymentMethodRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.paymentMethodRepository = paymentMethodRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddPaymentMethodDto addPaymentMethodDto)
        {

            var paymentMethodDomainModel = mapper.Map<PaymentMethod>(addPaymentMethodDto);

            try
            {
                dbContext.PaymentMethods.Add(paymentMethodDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the payment method.");
            }

            var paymentMethodDto = mapper.Map<PaymentMethodDto>(paymentMethodDomainModel);
            return Ok(paymentMethodDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var paymentMethods = await paymentMethodRepository.GetAllAsync();

            var paymentMethodsDto = mapper.Map<List<PaymentMethodDto>>(paymentMethods);

            return Ok(paymentMethodsDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var paymentMethod = await paymentMethodRepository.GetByIdAsync(id);

            if (paymentMethod == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<PaymentMethodDto>(paymentMethod));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePaymentMethodDto updatePaymentMethodDto)
        {
            var paymentMethodDomainModel = mapper.Map<PaymentMethod>(updatePaymentMethodDto);

            paymentMethodDomainModel = await paymentMethodRepository.UpdateAsync(id, paymentMethodDomainModel);

            if (paymentMethodDomainModel == null)
            {
                return NotFound();
            }

            var paymentMethodDto = mapper.Map<PaymentMethodDto>(paymentMethodDomainModel);

            return Ok(paymentMethodDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var paymentMethodDomainModel = await paymentMethodRepository.DeleteAsync(id);

            if (paymentMethodDomainModel == null)
            {
                return NotFound();
            }

            var paymentMethodDto = mapper.Map<PaymentMethodDto>(paymentMethodDomainModel);

            return Ok(paymentMethodDto);
        }
    }
}
