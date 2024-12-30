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
    public class GoalController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly IGoalRepository goalRepository;
        private readonly IMapper mapper;

        public GoalController(ExpenseTrackerDbContext dbContext,
            IGoalRepository goalRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.goalRepository = goalRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddGoalDto addGoalDto)
        {

            var goalDomainModel = mapper.Map<Goal>(addGoalDto);

            try
            {
                dbContext.Goals.Add(goalDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the goal.");
            }

            var goalDto = mapper.Map<GoalDto>(goalDomainModel);
            return Ok(goalDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var goals = await goalRepository.GetAllAsync();

            var goalDto = mapper.Map<List<GoalDto>>(goals);

            return Ok(goalDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var goal = await goalRepository.GetByIdAsync(id);

            if (goal == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<GoalDto>(goal));
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateGoalDto updateGoalDto)
        {
            var goalDomainModel = mapper.Map<Goal>(updateGoalDto);

            goalDomainModel = await goalRepository.UpdateAsync(id, goalDomainModel);

            if (goalDomainModel == null)
            {
                return NotFound();
            }

            var goalDto = mapper.Map<GoalDto>(goalDomainModel);

            return Ok(goalDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var goalDomainModel = await goalRepository.DeleteAsync(id);

            if (goalDomainModel == null)
            {
                return NotFound();
            }

            var goalDto = mapper.Map<GoalDto>(goalDomainModel);

            return Ok(goalDto);
        }
    }
}
