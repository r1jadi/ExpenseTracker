using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class SettingsDto
    {
        public int SettingsID { get; set; }
        public int UserID { get; set; }
        public string PreferenceName { get; set; }
        public string Value { get; set; }

        //rel

        public User User { get; set; }
    }
}
