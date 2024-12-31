namespace ExpenseTracker.API.Models.DTO
{
    public class AddNotificationDto
    {
        public int UserID { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public bool IsRead { get; set; }
        public string Type { get; set; }
    }
}
