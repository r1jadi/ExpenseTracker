namespace ExpenseTracker.API.Models.DTO
{
    public class UpdateAuditLogDto
    {
        public int UserID { get; set; }
        public string Action { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
