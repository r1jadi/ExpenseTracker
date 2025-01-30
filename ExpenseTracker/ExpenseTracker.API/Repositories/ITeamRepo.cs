using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface ITeamRepo
    {
        Task<List<Team>> GetAllAsync();

        Task<Team?> GetByIdAsync(int id);

        Task<Team> CreateAsync(Team team);

        Task<Team?> UpdateAsync(int id, Team team);

        Task<Team> DeleteAsync(int id);
    }
}
