namespace ExpenseTracker.API.Models.DTO
{
    public class AddSettingsDto
    {
        public int UserID { get; set; }
        public string PreferenceName { get; set; }
        public string Value { get; set; }
    }
}
