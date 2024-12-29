using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface ICurrencyRepository
    {
        Task<List<Currency>> GetAllAsync();
        Task<Currency?> GetByIdAsync(int id);
        Task<Currency> CreateAsync(Currency currency);
        Task<Currency?> UpdateAsync(int id, Currency currency);
        Task<Currency> DeleteAsync(int id);
    }
}
