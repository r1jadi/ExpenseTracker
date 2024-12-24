using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class AuditLogDto
    {
        public int AuditLogID { get; set; }
        public int UserID { get; set; }
        public string Action { get; set; }
        public DateTime Timestamp { get; set; }

        //rel

        public User User { get; set; }
    }
}
