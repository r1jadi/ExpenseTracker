using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLNotificationRepository : INotificationRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLNotificationRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Notification> CreateAsync(Notification notification)
        {
            await dbContext.Notifications.AddAsync(notification);
            await dbContext.SaveChangesAsync();
            return notification;
        }

        public async Task<Notification> DeleteAsync(int id)
        {
            var existingNotification = await dbContext.Notifications.FirstOrDefaultAsync(x => x.NotificationID == id);

            if (existingNotification == null)
            {
                return null;
            }

            dbContext.Notifications.Remove(existingNotification);

            await dbContext.SaveChangesAsync();

            return existingNotification;
        }

        public async Task<List<Notification>> GetAllAsync()
        {
            return await dbContext.Notifications.Include("User").ToListAsync();
        }

        public async Task<Notification?> GetByIdAsync(int id)
        {
            return await dbContext.Notifications
                .Include("User")
                .FirstOrDefaultAsync(x => x.NotificationID == id);
        }

        public async Task<Notification?> UpdateAsync(int id, Notification notification)
        {
            var existingNotification = await dbContext.Notifications.FirstOrDefaultAsync(x => x.NotificationID == id);

            if (existingNotification == null)
            {
                return null;
            }

            
            existingNotification.UserID = notification.UserID;
            existingNotification.Message = notification.Message;
            existingNotification.Date = notification.Date;
            existingNotification.IsRead = notification.IsRead;
            existingNotification.Type = notification.Type;

            await dbContext.SaveChangesAsync();

            return existingNotification;
        }
    }
}
