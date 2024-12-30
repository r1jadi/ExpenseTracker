namespace ExpenseTracker.API.Models.DTO
{
    public class AddGoalDto
    {
        public int UserID { get; set; }
        public decimal TargetAmount { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
    }
}
