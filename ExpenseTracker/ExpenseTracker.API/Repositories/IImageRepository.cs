using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IImageRepository
    {

        Task<Image> Upload(Image image);
    }
}
