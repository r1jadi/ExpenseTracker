using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.Domain
{
    public class Settings
    {
        public int SettingsID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public string PreferenceName { get; set; }
        public string Value { get; set; }

        // Relationship
        public IdentityUser User { get; set; } // Updated to use IdentityUser
    }
}
