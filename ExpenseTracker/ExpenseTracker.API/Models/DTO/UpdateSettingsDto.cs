namespace ExpenseTracker.API.Models.DTO
{
    public class UpdateSettingsDto
    {
        public int UserID { get; set; }
        public string PreferenceName { get; set; }
        public string Value { get; set; }
    }
}
