namespace ExpenseTracker.API.Models.Domain
{
    public class AuditLog
    {
        public int AuditLogID { get; set; }
        public int UserID { get; set; }
        public string Action { get; set; }
        public DateTime Timestamp { get; set; }

        //rel

        public User User { get; set; }
    }
}
