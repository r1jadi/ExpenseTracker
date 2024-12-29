using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IBudgetRepository
    {
        Task<List<Budget>> GetAllAsync();

        Task<Budget?> GetByIdAsync(int id);

        Task<Budget> CreateAsync(Budget budget);

        Task<Budget?> UpdateAsync(int id, Budget budget);

        Task<Budget> DeleteAsync(int id);
    }
}
