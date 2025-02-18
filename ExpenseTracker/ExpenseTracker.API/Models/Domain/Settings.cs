using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.Domain
{
    public class Settings
    {
        public int SettingsID { get; set; }
        public string UserID { get; set; } 
        public string PreferenceName { get; set; }
        public string Value { get; set; }

        public IdentityUser User { get; set; } 
    }
}
