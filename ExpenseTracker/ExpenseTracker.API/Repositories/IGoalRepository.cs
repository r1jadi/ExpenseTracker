using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IGoalRepository
    {
        Task<List<Goal>> GetAllAsync();

        Task<Goal?> GetByIdAsync(int id);

        Task<Goal> CreateAsync(Goal goal);

        Task<Goal?> UpdateAsync(int id, Goal goal);

        Task<Goal> DeleteAsync(int id);
    }
}
