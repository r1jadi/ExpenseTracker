using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface INotificationRepository
    {
        Task<List<Notification>> GetAllAsync();

        Task<Notification?> GetByIdAsync(int id);

        Task<Notification> CreateAsync(Notification notification);

        Task<Notification?> UpdateAsync(int id, Notification notification);

        Task<Notification> DeleteAsync(int id);
    }
}
