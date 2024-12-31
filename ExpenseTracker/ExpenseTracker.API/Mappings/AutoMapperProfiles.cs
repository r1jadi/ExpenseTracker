using AutoMapper;
using ExpenseTracker.API.Models.Domain;
using ExpenseTracker.API.Models.DTO;

namespace ExpenseTracker.API.Mappings
{
    public class AutoMapperProfiles:Profile
    {

        public AutoMapperProfiles()
        {
            CreateMap<Region, RegionDto>().ReverseMap();

            CreateMap<AddRegionRequestDto, Region>().ReverseMap();

            CreateMap<UpdateRegionRequestDto, Region>().ReverseMap();

            CreateMap<AddWalkRequestDto, Walk>().ReverseMap();

            CreateMap<Walk, WalkDto>().ReverseMap();

            CreateMap<Difficulty, DifficultyDto>().ReverseMap();

            CreateMap<UpdateWalkRequestDto, Walk>().ReverseMap();


            //USER
            CreateMap<User, UserDto>().ReverseMap();  

            CreateMap<AddUserRequestDto, User>().ReverseMap();

            CreateMap<UpdateUserRequestDto, User>().ReverseMap();

            //CATEGORY
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<AddCategoryRequestDto, Category>().ReverseMap();
            CreateMap<UpdateCategoryRequestDto, Category>().ReverseMap();

            //CURRENCY
            CreateMap<Currency, CurrencyDto>().ReverseMap();
            CreateMap<AddCurrencyRequestDto, Currency>().ReverseMap();
            CreateMap<UpdateCurrencyRequestDto, Currency>().ReverseMap();

            //TAG
            CreateMap<Tag, TagDto>().ReverseMap();
            CreateMap<AddTagDto, Tag>().ReverseMap();
            CreateMap<UpdateTagDto, Tag>().ReverseMap();

            //BUDGET
            CreateMap<Budget, BudgetDto>().ReverseMap();
            CreateMap<AddBudgetDto, Budget>().ReverseMap();
            CreateMap<UpdateBudgetDto, Budget>().ReverseMap();

            //GOAL
            CreateMap<Goal, GoalDto>().ReverseMap();
            CreateMap<AddGoalDto, Goal>().ReverseMap();
            CreateMap<UpdateGoalDto, Goal>().ReverseMap();

            //INCOME
            CreateMap<Income, IncomeDto>().ReverseMap();
            CreateMap<AddIncomeDto, Income>().ReverseMap();
            CreateMap<UpdateIncomeDto, Income>().ReverseMap();

            //NOTIFICATION
            CreateMap<Notification, NotificationDto>().ReverseMap();
            CreateMap<AddNotificationDto, Notification>().ReverseMap();
            CreateMap<UpdateNotificationDto, Notification>().ReverseMap();

            //PAYMENT METHOD
            CreateMap<PaymentMethod, PaymentMethodDto>().ReverseMap();
            CreateMap<AddPaymentMethodDto, PaymentMethod>().ReverseMap();
            CreateMap<UpdatePaymentMethodDto, PaymentMethod>().ReverseMap();
        }
    }
}
