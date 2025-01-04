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
    public class SettingsController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly ISettingsRepository settingsRepository;
        private readonly IMapper mapper;

        public SettingsController(ExpenseTrackerDbContext dbContext,
            ISettingsRepository settingsRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.settingsRepository = settingsRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddSettingsDto addSettingsDto)
        {

            var settingsDomainModel = mapper.Map<Settings>(addSettingsDto);

            try
            {
                dbContext.Settings.Add(settingsDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the setting.");
            }

            var settingsDto = mapper.Map<SettingsDto>(settingsDomainModel);
            return Ok(settingsDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var settings = await settingsRepository.GetAllAsync();

            var settingsDto = mapper.Map<List<SettingsDto>>(settings);
            return Ok(settingsDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var settings = await settingsRepository.GetByIdAsync(id);

            if (settings == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<SettingsDto>(settings));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSettingsDto updateSettingsDto)
        {
            var settingsDomainModel = mapper.Map<Settings>(updateSettingsDto);

            settingsDomainModel = await settingsRepository.UpdateAsync(id, settingsDomainModel);

            if (settingsDomainModel == null)
            {
                return NotFound();
            }

            var settingsDto = mapper.Map<SettingsDto>(settingsDomainModel);
            return Ok(settingsDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var settingsDomainModel = await settingsRepository.DeleteAsync(id);

            if (settingsDomainModel == null)
            {
                return NotFound();
            }

            var settingsDto = mapper.Map<SettingsDto>(settingsDomainModel);

            return Ok(settingsDto);
        }

    }
}
