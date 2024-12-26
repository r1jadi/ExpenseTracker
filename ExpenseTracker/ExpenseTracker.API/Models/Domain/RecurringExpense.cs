namespace ExpenseTracker.API.Models.Domain
{
    public class RecurringExpense
    {
        public int RecurringExpenseID { get; set; }
        public int UserID { get; set; }
        public decimal Amount { get; set; }
        public string Interval { get; set; }
        public DateTime NextDueDate { get; set; }
        public string Description { get; set; }

        //rel

        public User User { get; set; }
        //public ICollection<Expense> Expenses { get; set; }

    }
}
