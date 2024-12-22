namespace ExpenseTracker.API.Models.Domain
{
    public class Settings
    {
        public int SettingsID { get; set; }
        public int UserID { get; set; }
        public string PreferenceName { get; set; }
        public string Value { get; set; }

        //rel

        public User User { get; set; }
    }
}
