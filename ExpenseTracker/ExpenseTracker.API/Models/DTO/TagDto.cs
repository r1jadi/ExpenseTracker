using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Models.DTO
{
    public class TagDto
    {
        public int TagID { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

        //many-to-many

        public ICollection<ExpenseTag> ExpenseTags { get; set; }
    }
}
