namespace ExpenseTracker.API.Models.DTO
{
    public class AddAuditLogDto
    {
        public int UserID { get; set; }
        public string Action { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
