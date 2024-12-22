namespace ExpenseTracker.API.Models.Domain
{
    public class Notification
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
