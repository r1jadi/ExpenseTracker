using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface ISettingsRepository
    {
        Task<List<Settings>> GetAllAsync();
        Task<Settings?> GetByIdAsync(int id);
        Task<Settings> CreateAsync(Settings settings);
        Task<Settings?> UpdateAsync(int id, Settings settings);
        Task<Settings> DeleteAsync(int id);
    }
}
