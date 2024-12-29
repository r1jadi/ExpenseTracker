using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLTagRepository : ITagRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLTagRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Tag> CreateAsync(Tag tag)
        {
            await dbContext.Tags.AddAsync(tag);
            await dbContext.SaveChangesAsync();
            return tag;
        }

        public async Task<Tag> DeleteAsync(int id)
        {
            var existingTag = await dbContext.Tags.FirstOrDefaultAsync(x => x.TagID == id);
            if (existingTag == null)
            {
                return null;
            }

            dbContext.Tags.Remove(existingTag);
            await dbContext.SaveChangesAsync();
            return existingTag;
        }

        public async Task<List<Tag>> GetAllAsync()
        {
            return await dbContext.Tags.ToListAsync();
        }

        public async Task<Tag?> GetByIdAsync(int id)
        {
            return await dbContext.Tags.FirstOrDefaultAsync(x => x.TagID == id);
        }

        public async Task<Tag?> UpdateAsync(int id, Tag tag)
        {
            var existingTag = await dbContext.Tags.FirstOrDefaultAsync(x => x.TagID == id);

            if (existingTag == null)
            {
                return null;
            }

            existingTag.Name = tag.Name;
            existingTag.Description = tag.Description;
            
            await dbContext.SaveChangesAsync();
            return existingTag;
        }
    }
}
