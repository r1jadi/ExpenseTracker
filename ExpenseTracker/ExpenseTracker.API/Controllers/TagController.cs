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
    public class TagController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly ITagRepository tagRepository;
        private readonly IMapper mapper;

        public TagController(ExpenseTrackerDbContext dbContext,
            ITagRepository tagRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.tagRepository = tagRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddTagDto addTagDto)
        {

            var tagDomainModel = mapper.Map<Tag>(addTagDto);


            try
            {
                dbContext.Tags.Add(tagDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the user.");
            }

            var tagDto = mapper.Map<TagDto>(tagDomainModel);
            return Ok(tagDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var tags = await tagRepository.GetAllAsync();

            var tagsDto = mapper.Map<List<TagDto>>(tags);

            return Ok(tagsDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var tag = await tagRepository.GetByIdAsync(id);

            if (tag == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<TagDto>(tag));
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTagDto updateTagDto)
        {
            var tagDomainModel = mapper.Map<Tag>(updateTagDto);

            tagDomainModel = await tagRepository.UpdateAsync(id, tagDomainModel);

            if (tagDomainModel == null)
            {
                return NotFound();
            }

            var tagDto = mapper.Map<TagDto>(tagDomainModel);

            return Ok(tagDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var tagDomainModel = await tagRepository.DeleteAsync(id);

            if (tagDomainModel == null)
            {
                return NotFound();
            }

            var tagDto = mapper.Map<TagDto>(tagDomainModel);

            return Ok(tagDto);
        }
    }
}
