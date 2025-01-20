using Newtonsoft.Json;

namespace ExpenseTracker.API.Models.Domain
{
    public class Expense
    {
        public int ExpenseID { get; set; }
        public int UserID { get; set; }
        public int CategoryID { get; set; }
        public int CurrencyID { get; set; }
        public int? RecurringExpenseID { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string? Description { get; set; }
        public bool IsRecurring { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //relationships

        public User User { get; set; }
        public Category Category { get; set; }
        public Currency Currency { get; set; }
        public RecurringExpense? RecurringExpense { get; set; }
        public ICollection<ExpenseTag> ExpenseTags { get; set; }
    }
}
