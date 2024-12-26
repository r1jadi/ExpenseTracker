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
        }
    }
}
