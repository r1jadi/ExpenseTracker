using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Repositories
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user, List<string> roles);
    }
}
