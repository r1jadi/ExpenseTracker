using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLSettingsRepository : ISettingsRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLSettingsRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Settings> CreateAsync(Settings settings)
        {
            await dbContext.Settings.AddAsync(settings);
            await dbContext.SaveChangesAsync();
            return settings;
        }

        public async Task<Settings> DeleteAsync(int id)
        {
            var existingSettings = await dbContext.Settings.FirstOrDefaultAsync(x => x.SettingsID == id);

            if (existingSettings == null)
            {
                return null;
            }

            dbContext.Settings.Remove(existingSettings);

            await dbContext.SaveChangesAsync();

            return existingSettings;
        }

        public async Task<List<Settings>> GetAllAsync()
        {
            return await dbContext.Settings.Include("User").ToListAsync();
        }

        public async Task<Settings?> GetByIdAsync(int id)
        {
            return await dbContext.Settings
                .Include("User")
                .FirstOrDefaultAsync(x => x.SettingsID == id);
        }

        public async Task<Settings?> UpdateAsync(int id, Settings settings)
        {
            var existingSettings = await dbContext.Settings.FirstOrDefaultAsync(x => x.SettingsID == id);

            if (existingSettings == null)
            {
                return null;
            }
            existingSettings.UserID = settings.UserID;
            existingSettings.PreferenceName = settings.PreferenceName;
            existingSettings.Value = settings.Value;

            await dbContext.SaveChangesAsync();

            return existingSettings;
        }
    }
}
