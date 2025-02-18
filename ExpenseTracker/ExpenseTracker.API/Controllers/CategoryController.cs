using AutoMapper;
using ExpenseTracker.API.Data;
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
    public class CategoryController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext dbContext;
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;

        public CategoryController(ExpenseTrackerDbContext dbContext,
            ICategoryRepository categoryRepository,
            IMapper mapper)
        {
            this.dbContext = dbContext;
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] AddCategoryRequestDto addCategoryRequestDto)
        {

            var categoryDomainModel = mapper.Map<Category>(addCategoryRequestDto);

            try
            {
                dbContext.Categories.Add(categoryDomainModel);
                await dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the category.");
            }

            var categoryDto = mapper.Map<Category>(categoryDomainModel);
            return Ok(categoryDto);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var categories = await categoryRepository.GetAllAsync();

            var categoriesDto = mapper.Map<List<CategoryDto>>(categories);

            return Ok(categoriesDto);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var category = await categoryRepository.GetByIdAsync(id);

            if(category == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<CategoryDto>(category));
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCategoryRequestDto updateCategoryRequestDto)
        {
            var categoryDomainModel = mapper.Map<Category>(updateCategoryRequestDto);

            categoryDomainModel = await categoryRepository.UpdateAsync(id, categoryDomainModel);

            if (categoryDomainModel == null)
            {
                return NotFound();
            }

            var categoryDto = mapper.Map<CategoryDto>(categoryDomainModel);

            return Ok(categoryDto);
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task <IActionResult> Delete([FromRoute]int id)
        {
            var categoryDomainModel = await categoryRepository.DeleteAsync(id);

            if (categoryDomainModel == null)
            {
                return NotFound();
            }

            var categoryDto = mapper.Map<CategoryDto>(categoryDomainModel);

            return Ok(categoryDto);
        }
    }
}
