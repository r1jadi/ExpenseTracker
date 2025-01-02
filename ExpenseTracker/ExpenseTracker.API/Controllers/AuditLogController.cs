using AutoMapper;
using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;
using ExpenseTracker.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditLogController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly IAuditLogRepository auditLogRepository;
        private readonly IMapper mapper;

        public AuditLogController(ExpenseTrackerDbContext dbContext,
            IAuditLogRepository auditLogRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.auditLogRepository = auditLogRepository;
            this.mapper = mapper;
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddAuditLogDto addAuditLogDto)
        {

            var auditLogDomainModel = mapper.Map<AuditLog>(addAuditLogDto);

            try
            {
                dbContext.AuditLogs.Add(auditLogDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the audit log.");
            }

            var auditLogDto = mapper.Map<AuditLogDto>(auditLogDomainModel);
            return Ok(auditLogDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var auditLogs = await auditLogRepository.GetAllAsync();

            var auditLogsDto = mapper.Map<List<AuditLogDto>>(auditLogs);
            return Ok(auditLogsDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var auditLog = await auditLogRepository.GetByIdAsync(id);

            if (auditLog == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<AuditLogDto>(auditLog));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAuditLogDto updateAuditLogDto)
        {
            var auditLogDomainModel = mapper.Map<AuditLog>(updateAuditLogDto);

            auditLogDomainModel = await auditLogRepository.UpdateAsync(id, auditLogDomainModel);

            if (auditLogDomainModel == null)
            {
                return NotFound();
            }

            var auditLogDto = mapper.Map<AuditLogDto>(auditLogDomainModel);
            return Ok(auditLogDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var auditLogDomainModel = await auditLogRepository.DeleteAsync(id);

            if (auditLogDomainModel == null)
            {
                return NotFound();
            }

            var auditLogDto = mapper.Map<AuditLogDto>(auditLogDomainModel);

            return Ok(auditLogDto);
        }
    }
}
