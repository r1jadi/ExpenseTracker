using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models
{
    public interface ISubscriptionRepository
    {
        Task<List<Subscription>> GetAllAsync();

        Task<Subscription?> GetByIdAsync(int id);

        Task<Subscription> CreateAsync(Subscription subscription);

        Task<Subscription?> UpdateAsync(int id, Subscription subscription);

        Task<Subscription> DeleteAsync(int id);
    }
}
