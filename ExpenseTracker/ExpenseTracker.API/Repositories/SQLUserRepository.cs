using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLUserRepository : IUserRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLUserRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<User> CreateAsync(User user)
        {
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> DeleteAsync(int id)
        {
            var existingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.UserID == id);
            if(existingUser == null)
            {
                return null;
            }

            dbContext.Users.Remove(existingUser);
            await dbContext.SaveChangesAsync();
            return existingUser;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await dbContext.Users.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await dbContext.Users.FirstOrDefaultAsync(x => x.UserID == id);
        }

        public async Task<User?> UpdateAsync(int id, User user)
        {
            var existingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.UserID == id);

            if(existingUser == null)
            {
                return null;
            }

            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            existingUser.Password = user.Password;
            existingUser.Role = user.Role;
            existingUser.ProfilePicture = user.ProfilePicture;
            existingUser.CreatedAt = user.CreatedAt;
            existingUser.UpdatedAt = user.UpdatedAt;

            await dbContext.SaveChangesAsync();
            return existingUser;
        }
    }
}
