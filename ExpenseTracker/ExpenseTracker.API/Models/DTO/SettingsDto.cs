using ExpenseTracker.API.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.DTO
{
    public class SettingsDto
    {
        public int SettingsID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public string PreferenceName { get; set; }
        public string Value { get; set; }

        // Relationship
        public IdentityUser User { get; set; } // Updated to use IdentityUser
    }
}
