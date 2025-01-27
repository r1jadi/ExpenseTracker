namespace ExpenseTracker.API.Models.DTO
{
    public class AddBudgetDto
    {
        public string UserID { get; set; }
        public int CategoryID { get; set; }
        public decimal Limit { get; set; }
        public string Period { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
