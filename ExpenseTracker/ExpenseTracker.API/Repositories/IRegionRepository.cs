using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace ExpenseTracker.API.Repositories
{
    public interface IRegionRepository
    {
        Task<List<Region>> GetAllAsync();

        Task<Region?>GetByIdAsync(Guid id);

        Task<Region>CreateAsync(Region region);

        Task<Region?>UpdateAsync(Guid id, Region region);

        Task<Region>DeleteAsync(Guid id);
    }
}
