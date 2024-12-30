using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IIncomeRepository
    {
        Task<List<Income>> GetAllAsync();

        Task<Income?> GetByIdAsync(int id);

        Task<Income> CreateAsync(Income income);

        Task<Income?> UpdateAsync(int id, Income income);

        Task<Income> DeleteAsync(int id);
    }
}
