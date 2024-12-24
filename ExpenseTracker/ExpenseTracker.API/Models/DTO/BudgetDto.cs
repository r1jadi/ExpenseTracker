using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class BudgetDto
    {
        public int BudgetID { get; set; }
        public int UserID { get; set; }
        public int CategoryID { get; set; }
        public decimal Limit { get; set; }
        public string Period { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //relationships

        public User User { get; set; }
        public Category Category { get; set; }
    }
}
