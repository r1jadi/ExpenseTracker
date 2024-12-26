using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLCategoryRepository : ICategoryRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLCategoryRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();
            return category;
        }

        public async Task<Category> DeleteAsync(int id)
        {
            var existingCategory = await dbContext.Categories.FirstOrDefaultAsync(x => x.CategoryID == id);
            if (existingCategory == null)
            {
                return null;
            }

            dbContext.Categories.Remove(existingCategory);
            await dbContext.SaveChangesAsync();
            return existingCategory;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await dbContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            return await dbContext.Categories.FirstOrDefaultAsync(x =>x.CategoryID == id);
        }

        public async Task<Category?> UpdateAsync(int id, Category category)
        {
            var existingCategory = await dbContext.Categories.FirstOrDefaultAsync(x => x.CategoryID == id);

            if (existingCategory == null) 
            {
                return null;
            }

            existingCategory.Name = category.Name;
            existingCategory.Description = category.Description;

            await dbContext.SaveChangesAsync();
            return existingCategory;
        }
    }
}
