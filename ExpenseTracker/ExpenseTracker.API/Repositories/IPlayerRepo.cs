using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IPlayerRepo
    {
        Task<List<Player>> GetAllAsync();

        Task<Player?> GetByIdAsync(int id);

        Task<Player> CreateAsync(Player player);

        Task<Player?> UpdateAsync(int id, Player player);

        Task<Player> DeleteAsync(int id);
    }
}
