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
    public class NotificationController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly INotificationRepository notificationRepository;
        private readonly IMapper mapper;

        public NotificationController(ExpenseTrackerDbContext dbContext,
            INotificationRepository notificationRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.notificationRepository = notificationRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddNotificationDto addNotificationDto)
        {

            var notificationDomainModel = mapper.Map<Notification>(addNotificationDto);

            try
            {
                dbContext.Notifications.Add(notificationDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the notification.");
            }

            var notificationDto = mapper.Map<NotificationDto>(notificationDomainModel);
            return Ok(notificationDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var notifications = await notificationRepository.GetAllAsync();

            var notificationsDto = mapper.Map<List<NotificationDto>>(notifications);

            return Ok(notificationsDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var notification = await notificationRepository.GetByIdAsync(id);

            if (notification == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<NotificationDto>(notification));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateNotificationDto updateNotificationDto)
        {
            var notificationDomainModel = mapper.Map<Notification>(updateNotificationDto);

            notificationDomainModel = await notificationRepository.UpdateAsync(id, notificationDomainModel);

            if (notificationDomainModel == null)
            {
                return NotFound();
            }

            var notificationDto = mapper.Map<NotificationDto>(notificationDomainModel);

            return Ok(notificationDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var notificationDomainModel = await notificationRepository.DeleteAsync(id);

            if (notificationDomainModel == null)
            {
                return NotFound();
            }

            var notificationDto = mapper.Map<NotificationDto>(notificationDomainModel);

            return Ok(notificationDto);
        }

    }
}
