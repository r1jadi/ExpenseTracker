using AutoMapper;
using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;
using ExpenseTracker.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly ISubscriptionRepository subscriptionRepository;
        private readonly IMapper mapper;

        public SubscriptionController(ExpenseTrackerDbContext dbContext,
            ISubscriptionRepository subscriptionRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.subscriptionRepository = subscriptionRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddSubscriptionDto addSubscriptionDto)
        {

            var subscriptionDomainModel = mapper.Map<Subscription>(addSubscriptionDto);

            try
            {
                dbContext.Subscriptions.Add(subscriptionDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the subscription.");
            }

            var subscriptionDto = mapper.Map<SubscriptionDto>(subscriptionDomainModel);
            return Ok(subscriptionDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var subscriptions = await subscriptionRepository.GetAllAsync();

            var subscriptionDto = mapper.Map<List<SubscriptionDto>>(subscriptions);
            return Ok(subscriptionDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var subscription = await subscriptionRepository.GetByIdAsync(id);

            if (subscription == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<SubscriptionDto>(subscription));
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSubscriptionDto updateSubscriptionDto)
        {
            var subscriptionDomainModel = mapper.Map<Subscription>(updateSubscriptionDto);

            subscriptionDomainModel = await subscriptionRepository.UpdateAsync(id, subscriptionDomainModel);

            if (subscriptionDomainModel == null)
            {
                return NotFound();
            }

            var subscriptionDto = mapper.Map<SubscriptionDto>(subscriptionDomainModel);
            return Ok(subscriptionDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var subscriptionDomainModel = await subscriptionRepository.DeleteAsync(id);

            if (subscriptionDomainModel == null)
            {
                return NotFound();
            }

            var subcriptionDto = mapper.Map<SubscriptionDto>(subscriptionDomainModel);

            return Ok(subcriptionDto);
        }

    }
}
