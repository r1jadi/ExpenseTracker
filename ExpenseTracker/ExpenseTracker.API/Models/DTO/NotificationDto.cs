using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class NotificationDto
    {
        public int NotificationID { get; set; }
        public int UserID { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public bool IsRead { get; set; }
        public string Type { get; set; }

        //rel

        public User User { get; set; }
    }
}
