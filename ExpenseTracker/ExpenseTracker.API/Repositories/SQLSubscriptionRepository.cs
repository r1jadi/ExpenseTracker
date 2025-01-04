using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLSubscriptionRepository : ISubscriptionRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLSubscriptionRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Subscription> CreateAsync(Subscription subscription)
        {
            await dbContext.Subscriptions.AddAsync(subscription);
            await dbContext.SaveChangesAsync();
            return subscription;
        }

        public async Task<Subscription> DeleteAsync(int id)
        {
            var existingSubscription = await dbContext.Subscriptions.FirstOrDefaultAsync(x => x.SubscriptionID == id);

            if (existingSubscription == null)
            {
                return null;
            }

            dbContext.Subscriptions.Remove(existingSubscription);

            await dbContext.SaveChangesAsync();

            return existingSubscription;
        }

        public async Task<List<Subscription>> GetAllAsync()
        {
            return await dbContext.Subscriptions.Include("User").Include("Currency").ToListAsync();
        }

        public async Task<Subscription?> GetByIdAsync(int id)
        {
            return await dbContext.Subscriptions
                .Include("User")
                .Include("Currency")
                .FirstOrDefaultAsync(x => x.SubscriptionID == id);
        }

        public async Task<Subscription?> UpdateAsync(int id, Subscription subscription)
        {
            var existingSubscription = await dbContext.Subscriptions.FirstOrDefaultAsync(x => x.SubscriptionID == id);

            if (existingSubscription == null)
            {
                return null;
            }

            existingSubscription.UserID = subscription.UserID;
            existingSubscription.CurrencyID = subscription.CurrencyID;
            existingSubscription.ServiceName = subscription.ServiceName;
            existingSubscription.Cost = subscription.Cost;
            existingSubscription.RenewalDate = subscription.RenewalDate;
            existingSubscription.IsActive = subscription.IsActive;

            await dbContext.SaveChangesAsync();

            return existingSubscription;
        }
    }
}
